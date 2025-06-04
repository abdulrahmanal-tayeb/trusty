import 'package:flutter/material.dart';

class ContainerWidget extends StatefulWidget {
  final Widget child;
  final EdgeInsetsGeometry padding;
  final Color? backgroundColor;
  final BorderRadiusGeometry borderRadius;
  final Color? borderColor;
  final String? label;
  final TextStyle? labelStyle;
  final bool skeleton;
  final double? skeletonHeight;

  const ContainerWidget({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.all(20),
    this.backgroundColor,
    this.borderRadius = const BorderRadius.all(Radius.circular(20)),
    this.borderColor,
    this.label,
    this.labelStyle,
    this.skeleton = false,
    this.skeletonHeight
  });

  @override
  State<ContainerWidget> createState() => _ContainerWidgetState();
}

class _ContainerWidgetState extends State<ContainerWidget>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _fadeAnim;

  @override
  void initState() {
    super.initState();
    // Always initialize controller & animation
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    );
    _fadeAnim = Tween<double>(begin: 0.3, end: 0.7).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
    // Start animation only if skeleton
    if (widget.skeleton) {
      _controller.repeat(reverse: true);
    }
  }

  @override
  void didUpdateWidget(ContainerWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    // If skeleton flag changes, start/stop the animation accordingly
    if (widget.skeleton && !_controller.isAnimating) {
      _controller.repeat(reverse: true);
    } else if (!widget.skeleton && _controller.isAnimating) {
      _controller.stop();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final bgColor =
        widget.backgroundColor ?? const Color(0xFF1C1C2E); 
    final bdColor =
        widget.borderColor ?? Colors.white.withOpacity(0.1);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (widget.label != null)
          Padding(
            padding: const EdgeInsets.only(bottom: 8.0, left: 4.0),
            child: Text(
              widget.label!,
              style: widget.labelStyle ??
                  const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: Colors.white,
                  ),
            ),
          ),
        // If skeleton == true, show blinking placeholder
        if (widget.skeleton)
          AnimatedBuilder(
            animation: _fadeAnim,
            builder: (context, _) => Container(
              width: double.infinity,
              height: widget.skeletonHeight,
              padding: widget.padding,
              decoration: BoxDecoration(
                color: bgColor.withOpacity(_fadeAnim.value),
                borderRadius: widget.borderRadius,
                border: Border.all(color: bdColor),
              ),
              // Simple skeleton block
              child: SizedBox(
                height: 16,
                width: double.infinity * 0.6,
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(4),
                  ),
                ),
              ),
            ),
          )
        else
          // Normal container with child
          Container(
            width: double.infinity,
            padding: widget.padding,
            decoration: BoxDecoration(
              color: bgColor,
              borderRadius: widget.borderRadius,
              border: Border.all(color: bdColor),
            ),
            child: widget.child,
          ),
      ],
    );
  }
}
