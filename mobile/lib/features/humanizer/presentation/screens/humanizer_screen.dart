import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:provider/provider.dart';
import 'package:trusty/features/humanizer/presentation/widgets/features/humanizer_screen/humanizer_input.dart';
import 'package:trusty/features/humanizer/presentation/widgets/features/humanizer_screen/humanizer_options.dart';
import 'package:trusty/providers/user_input_provider.dart';

class HumanizerScreen extends StatefulWidget {
  const HumanizerScreen({super.key});

  @override
  State<HumanizerScreen> createState() => _HumanizerScreenState();
}

class _HumanizerScreenState extends State<HumanizerScreen> {
  final ScrollController _scrollController = ScrollController();

  void _scrollToOptions() {
    _scrollController.animateTo(
      _scrollController.position.maxScrollExtent,
      duration: const Duration(milliseconds: 400),
      curve: Curves.easeInOut,
    );
  }

  @override
  Widget build(BuildContext context) {
    final provider = context.read<UserInputProvider>();

    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24.0),
        child: SingleChildScrollView(
          controller: _scrollController,
          child: Column(
            spacing: 20,
            children: [
              const SizedBox(height: 30),
              SvgPicture.asset(
                'assets/logos/logo.svg',
                height: 50,
                width: 50,
                semanticsLabel: 'Logo',
              ),
              const SizedBox(height: 10),
              HumanizerInput(
                onScrollClicked: _scrollToOptions,
                onChange: (value) {
                  provider.setValue(UserInputField.text, value);
                },
              ),
              HumanizerOptions(),
            ],
          ),
        ) 
      ),
    );
  }
}
