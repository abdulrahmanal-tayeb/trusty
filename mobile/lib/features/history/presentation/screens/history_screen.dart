import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:trusty/features/history/presentation/widgets/history_item.dart';
import 'package:trusty/widgets/layout/app_bar_widget.dart';
import 'package:trusty/widgets/layout/scaffold_widget.dart';


class HistoryScreen extends StatelessWidget {
  const HistoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final dummyData = [
      {
        'title': 'Morning Note',
        'message': 'Don’t forget to review the project proposal and send feedback.',
        'date': 'May 24, 2025 08:15 AM',
      },
      {
        'title': 'Lunch Reminder',
        'message': 'Time to order your lunch. Try that new café downtown!',
        'date': 'May 24, 2025 12:30 PM',
      },
      {
        'title': 'Evening Summary',
        'message': 'Summarized today’s tasks and planned for tomorrow.',
        'date': 'May 23, 2025 06:45 PM',
      },
    ];

    return Scaffoldwidget(
      appBar: AppBarWidget(title: "History"),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        child: ListView.builder(
          itemCount: dummyData.length,
          itemBuilder: (context, index) {
            final item = dummyData[index];
            return HistoryItem(
              title: item['title']!,
              message: item['message']!,
              date: item['date']!,
              onCopy: () {
                Clipboard.setData(ClipboardData(text: item['message']!));
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Copied to clipboard')),
                );
              },
              onDelete: () {
                // Implement removal logic
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('Deleted "${item['title']}"')),
                );
              },
            );
          },
        ),
      ),
    );
  }
}
