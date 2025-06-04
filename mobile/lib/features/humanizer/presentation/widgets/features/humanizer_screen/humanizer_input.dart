import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'package:trusty/widgets/clickables/button_widget.dart';
import 'package:trusty/widgets/layout/container_widget.dart';

class HumanizerInput extends StatefulWidget {
  final void Function() onScrollClicked;
  final void Function(String?)? onChange;
  const HumanizerInput({
    super.key,
    required this.onScrollClicked,
    this.onChange
  });

  @override
  State<HumanizerInput> createState() => _HumanizerInputState();
}

class _HumanizerInputState extends State<HumanizerInput> {
  final TextEditingController _controller = TextEditingController();

  void _humanizeText(){
    if(_controller.value.text.isEmpty){
      return;
    }

    context.push("/analysis");
  }
  @override
  void initState() {
    super.initState();
    _controller.addListener(() {
      widget.onChange?.call(_controller.text);
      setState(() {}); // Rebuilds when the user types or deletes
    });
  }

  @override
  Widget build(BuildContext context) {
    return ContainerWidget(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          SizedBox(
            height: 200,
            child: Stack(
              children: [
                TextField(
                  controller: _controller,
                  maxLines: null,
                  expands: true, // Make TextField fill all vertical space
                  style: const TextStyle(color: Colors.white),
                  cursorColor: Colors.white,
                  textAlignVertical: TextAlignVertical.top,
                  decoration: const InputDecoration(
                    contentPadding: EdgeInsets.only(top: 10, left: 8, right: 8),
                    border: InputBorder.none,
                    enabledBorder: InputBorder.none,
                    focusedBorder: InputBorder.none,
                  ),
                ),
                if (_controller.text.isEmpty)
                  const Positioned(
                    top: 12,
                    left: 12,
                    child: Text(
                      "Message to be processed...",
                      style: TextStyle(
                        fontSize: 14,
                      ),
                    ),
                  ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  IconButton(
                    icon: const Icon(Icons.paste),
                    tooltip: 'Paste from clipboard',
                    onPressed: () async {
                      final clipboard = await Clipboard.getData('text/plain');
                      if (clipboard?.text != null) {
                        setState(() {
                          _controller.text = clipboard!.text!;
                        });
                      }
                    },
                  ),
                  IconButton(
                    icon: const Icon(Icons.adjust),
                    onPressed: widget.onScrollClicked,
                    tooltip: 'Go to Options',
                  ),
                ],
              ),
              ButtonWidget(
                onPressed: _humanizeText,
                text: "Humanize",
              ),
            ],
          ),
        ],
      ),
    );
  }
}