import 'package:flutter/material.dart';
import 'package:percent_indicator/circular_percent_indicator.dart';
import 'package:trusty/widgets/layout/container_widget.dart';
import 'package:trusty/widgets/layout/divider_widget.dart';

class ScoreInsightsWidget extends StatelessWidget {
  final double score; // 0–100
  final List<String> refinementPoints;
  final bool isLoading;

  const ScoreInsightsWidget({
    super.key,
    required this.score,
    required this.refinementPoints,
    this.isLoading = false
  });

  @override
  Widget build(BuildContext context) {

    return ContainerWidget(
      skeleton: isLoading,
      skeletonHeight: 300,
      label: "Insights",
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // Circular Score Chart
          Column(
            spacing: 20,
            children: [
              CircularPercentIndicator(
                radius: 60.0,
                lineWidth: 10.0,
                percent: (score.clamp(0, 100)) / 100,
                center: Text(
                  "${score.toInt()}%",
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                progressColor: Colors.greenAccent,
                backgroundColor: Colors.white10,
                circularStrokeCap: CircularStrokeCap.round,
                animation: true,
              ),
              const Text("Human Generated", style: TextStyle(fontSize: 20),)
            ],
          ),

          DividerWidget(),

          // Refinement Points Title
          const Align(
            alignment: Alignment.centerLeft,
            child: Text(
              "Changes Made: ",
              style: TextStyle(
                fontSize: 16,
                color: Colors.white70,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          const SizedBox(height: 12),

          // Dynamic List
          ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: refinementPoints.length,
            separatorBuilder: (_, __) => const SizedBox(height: 8),
            itemBuilder: (context, index) {
              return Row(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Icon(Icons.check, size: 15, color: Colors.white54),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      refinementPoints[index],
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 15,
                      ),
                    ),
                  ),
                ],
              );
            },
          ),
        ],
      ),
    );
  }
}
