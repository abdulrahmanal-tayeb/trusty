
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:trusty/widgets/clickables/button_widget.dart';

enum StepStatus { pending, loading, done }

class StepProgressWidget extends StatefulWidget {
  final List<String> steps;
  final bool isCompleted;
  final void Function(Placeholder) onComplete;

  const StepProgressWidget({super.key, this.isCompleted = false, required this.steps, required this.onComplete});

  @override
  State<StepProgressWidget> createState() => _StepProgressWidgetState();
}

class _StepProgressWidgetState extends State<StepProgressWidget> {
  int currentStep = 0;
  late List<StepStatus> statuses;

  @override
  void initState() {
    super.initState();
    statuses = List.generate(widget.steps.length, (index) => StepStatus.pending);
    _simulateProgress();
  }

  // SSE Is not setup in the backend, until then, simulate some progress.
  Future<void> _simulateProgress() async {
    setState(() => statuses[0] = StepStatus.loading);
    Future.delayed(const Duration(seconds: 2), (){
      setState((){
        statuses[0] = StepStatus.done;
        statuses[1] = StepStatus.loading;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ...List.generate(widget.steps.length * 2 - 1, (i) {
            if (i.isOdd) {
              return Container(
                height: 32,
                width: 2,
                color: Colors.white12,
                margin: const EdgeInsets.only(left: 14),
              );
            }

            final index = i ~/ 2;
            final status = widget.isCompleted? StepStatus.done : statuses[index];

            return Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildStepCircle(index + 1, status),
                const SizedBox(width: 12),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.only(top: 4.0),
                    child: Text(
                      widget.steps[index],
                      style: TextStyle(
                        color: status == StepStatus.pending ? Colors.white24 : Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ),
              ],
            );
          }),

          if(!widget.isCompleted)
            Container(
              margin: const EdgeInsets.only(top: 30),
              child: ButtonWidget(
                backgroundColor: Colors.red,
                foregroundColor: Colors.white,
                onPressed: (){
                  context.pop();
                }, 
                text: "Cancel"
              ),
            )
        ],
      );
  }

  Widget _buildStepCircle(int number, StepStatus status) {
    final size = 28.0;

    return SizedBox(
      height: size,
      width: size,
      child: Stack(
        alignment: Alignment.center,
        children: [
          if (status == StepStatus.loading)
            SizedBox(
              height: size,
              width: size,
              child: CircularProgressIndicator(
                strokeWidth: 2.5,
                valueColor: const AlwaysStoppedAnimation<Color>(Colors.white),
              ),
            ),
          if (status == StepStatus.done)
            Container(
              height: size,
              width: size,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: Colors.green, width: 2),
              ),
            ),
          Text(
            '$number',
            style: TextStyle(
              color: status == StepStatus.done ? Colors.green : Colors.white,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
