import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:trusty/features/humanizer/presentation/widgets/features/analysis_screen/score_insights_widget.dart';

import 'package:trusty/features/humanizer/presentation/widgets/features/analysis_screen/step_progress_widget.dart';
import 'package:trusty/providers/user_input_provider.dart';
import 'package:trusty/widgets/inputs/text_field_widget.dart';
import 'package:trusty/widgets/layout/container_widget.dart';
import 'package:trusty/widgets/layout/divider_widget.dart';
import 'package:http/http.dart' as http;

class AnalysisScreen extends StatefulWidget {
  const AnalysisScreen({super.key});

  @override
  State<AnalysisScreen> createState() => _AnalysisScreenState();
}

class _AnalysisScreenState extends State<AnalysisScreen> {
  late Future<List<Map<String, dynamic>>> futureResult;

  @override
  void initState() {
    super.initState();
    futureResult = callHumanizeAPI();
  }

  Future<List<Map<String, dynamic>>> callHumanizeAPI() async {
    final provider = context.read<UserInputProvider>();
    final BASE_URL = dotenv.env['BASE_URL'];
    final url = Uri.parse('$BASE_URL/api/humanize/');

    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'text': provider.text,
        'options': {
          'language': provider.language,
          'tone': provider.tone,
          'resultType': provider.resultType
        },
      }),
    );

    if (response.statusCode == 200) {
      final resultList = jsonDecode(response.body);
      return List<Map<String, dynamic>>.from(resultList);
    } else {
      throw Exception("Failed to humanize text: ${response.body}");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    IconButton(
                      onPressed: (){
                        context.pop();
                      }, 
                      icon: Icon(Icons.arrow_back_ios_new_sharp)
                    ),
                    const Text(
                      "Analysing...",
                      style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
                    )
                  ],
                ),
                const SizedBox(height: 20),
                FutureBuilder<List<Map<String, dynamic>>>(
                  future: futureResult,
                  builder: (context, snapshot) {
                    if (snapshot.hasError) {
                      return Center(child: Text('Error: ${snapshot.error}'));
                    }

                    final bool isWaiting = snapshot.connectionState == ConnectionState.waiting;
                    final result = snapshot.data;

                    return Column(
                      children: [
                        StepProgressWidget(
                          isCompleted: !isWaiting || result != null,
                          steps: const [
                            'Analyzing the message',
                            'Humanizing and refining',
                          ],
                          onComplete: (thing) {
                            // do anything.
                          },
                        ),
                        DividerWidget(),
                        ContainerWidget(
                          skeleton: result == null,
                          skeletonHeight: 300,
                          label: "Results",
                          padding: EdgeInsets.zero,
                          child: TextFieldWidget(
                            label: "Refined Message",
                            initialValue: result?.last['result'] ?? '',
                            readOnly: true,
                          ),
                        ),
                        const SizedBox(height: 30,),
                        ScoreInsightsWidget(
                          score: ((result?.last['humanized_score'] ?? 75) as int).toDouble(),
                          isLoading: result == null,
                          refinementPoints: result == null
                              ? const []
                              : result
                                  .expand((step) => step['changes'] as List<dynamic>)
                                  .cast<String>()
                                  .toList(),
                        ),
                      ],
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
