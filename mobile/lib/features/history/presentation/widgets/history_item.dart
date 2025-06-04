import 'package:flutter/material.dart';

class HistoryItem extends StatelessWidget {
  final String title;
  final String message;
  final String date;
  final VoidCallback? onDelete;
  final VoidCallback? onCopy;

  const HistoryItem({
    super.key,
    required this.title,
    required this.message,
    required this.date,
    this.onDelete,
    this.onCopy,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF1C1C2E),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Title & Actions
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Text(
                  title,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              IconButton(
                icon: const Icon(Icons.copy, size: 20, color: Colors.white54),
                tooltip: 'Copy',
                onPressed: onCopy,
              ),
              IconButton(
                icon: const Icon(Icons.delete_outline, size: 20, color: Colors.white54),
                tooltip: 'Delete',
                onPressed: onDelete,
              ),
            ],
          ),

          const SizedBox(height: 8),
          // Message (2–3 lines)
          Text(
            message,
            style: const TextStyle(
              color: Colors.white70,
              fontSize: 14,
              height: 1.4,
            ),
            maxLines: 3,
            overflow: TextOverflow.ellipsis,
          ),

          const SizedBox(height: 12),
          // Date
          Text(
            date,
            style: const TextStyle(
              color: Colors.white38,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }
}