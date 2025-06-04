import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:trusty/widgets/layout/container_widget.dart';

class TextFieldWidget extends StatefulWidget {
  final String label;
  final String hintText;
  final String? initialValue;
  final bool readOnly;

  const TextFieldWidget({
    super.key,
    required this.label,
    this.hintText = "Type Something...",
    this.initialValue,
    this.readOnly = false,
  });

  @override
  State<TextFieldWidget> createState() => _TextFieldWidgetState();
}

class _TextFieldWidgetState extends State<TextFieldWidget> {
  late final TextEditingController _controller;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.initialValue ?? '');
  }

  void _copyText() {
    Clipboard.setData(ClipboardData(text: _controller.text));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Copied to clipboard')),
    );
  }

  void _resetText() {
    setState(() => _controller.clear());
  }

  @override
  Widget build(BuildContext context) {
    return ContainerWidget(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            widget.label,
            style: const TextStyle(color: Colors.white54, fontSize: 14),
          ),
          const SizedBox(height: 8),
          TextField(
            controller: _controller,
            readOnly: widget.readOnly,
            maxLines: null,
            style: const TextStyle(color: Colors.white),
            cursorColor: Colors.white,
            decoration: InputDecoration(
              hintText: widget.hintText,
              hintStyle: const TextStyle(color: Colors.white38),
              border: InputBorder.none,
              contentPadding: const EdgeInsets.only(top: 10, left: 8, right: 8),
              enabledBorder: InputBorder.none,
              focusedBorder: InputBorder.none,
            ),
          ),
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              IconButton(
                icon: const Icon(Icons.copy, color: Colors.white),
                tooltip: 'Copy',
                onPressed: _copyText,
              ),
              if (!widget.readOnly)
                IconButton(
                  icon: const Icon(Icons.refresh, color: Colors.white),
                  tooltip: 'Reset',
                  onPressed: _resetText,
                ),
            ],
          )
        ],
      ),
    );
  }
}
