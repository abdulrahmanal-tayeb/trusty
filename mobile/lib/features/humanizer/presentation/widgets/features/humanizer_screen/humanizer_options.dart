import 'package:flutter/material.dart';
import 'package:trusty/widgets/inputs/drop_down_widget.dart';
import 'package:trusty/widgets/layout/container_widget.dart';

class HumanizerOptions extends StatefulWidget {
  const HumanizerOptions({super.key});

  @override
  State<HumanizerOptions> createState() => _HumanizerOptionsState();
}

class _HumanizerOptionsState extends State<HumanizerOptions> {
  String _selectedLanguage = 'English';
  String _selectedTone = 'Professional';
  String _selectedResultType = 'Summarized';

  final List<String> languages = ['English', 'Arabic', 'French', 'Spanish'];
  final List<String> tones = ['Professional', 'Friendly', 'Neutral', 'Empathetic'];
  final List<String> resultTypes = ['Summarized', 'Detailed', 'Rewritten'];

  @override
  Widget build(BuildContext context) {
    return ContainerWidget(
      label: "Customize Result",
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Row 1: Language & Tone
          Row(
            children: [
              Expanded(
                child: DropDownWidget(
                  label: "Select Language",
                  value: _selectedLanguage,
                  items: languages,
                  onChanged: (v) => setState(() => _selectedLanguage = v!),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: DropDownWidget(
                  label: "Select Tone",
                  value: _selectedTone,
                  items: tones,
                  onChanged: (v) => setState(() => _selectedTone = v!),
                ),
              ),
            ],
          ),

          const SizedBox(height: 20),

          // Row 2: Result Type (only one)
          Row(
            children: [
              Expanded(
                child: DropDownWidget(
                  label: "Result Type",
                  value: _selectedResultType,
                  items: resultTypes,
                  onChanged: (v) => setState(() => _selectedResultType = v!),
                ),
              ),
            ],
          ),

          const SizedBox(height: 20),

          // Full-width upload button
          // SizedBox(
          //   width: double.infinity,
          //   child: OutlinedButton.icon(
          //     onPressed: () {
          //       // document picker logic
          //     },
          //     icon: const Icon(Icons.upload_file_rounded),
          //     label: const Text("Upload document to detect tone"),
          //     style: OutlinedButton.styleFrom(
          //       shape: RoundedRectangleBorder(
          //         borderRadius: BorderRadius.circular(12),
          //       ),
          //     ),
          //   ),
          // ),
        ],
      ),
    );
  }
}
