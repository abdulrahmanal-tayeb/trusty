import 'package:flutter/material.dart';

class BottomAppBarWidget extends StatefulWidget {
  final int activeIndex;
  final void Function(int) onTabChange;
  const BottomAppBarWidget({super.key, required this.activeIndex, required this.onTabChange});

  @override
  State<BottomAppBarWidget> createState() => _BottomAppBarWidgetState();
}

class _BottomAppBarWidgetState extends State<BottomAppBarWidget> {

  final List<IconData> _icons = [
    Icons.home_rounded,
    Icons.info,
    // Icons.favorite_border_rounded,
    // Icons.person_rounded,
  ];

  final List<String> _labels = const [
    'Home',
    'About',
    // 'Favorites',
    // 'Profile',
  ];

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.all(16.0),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            color: Theme.of(context).colorScheme.onPrimary,
            borderRadius: BorderRadius.circular(25),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: List.generate(_icons.length, (index) {
              final isActive = widget.activeIndex == index;
              return GestureDetector(
                onTap: () => widget.onTabChange(index),
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 300),
                  curve: Curves.easeOut,
                  padding: EdgeInsets.symmetric(
                    horizontal: isActive ? 20 : 12,
                    vertical: 10,
                  ),
                  decoration: BoxDecoration(
                    color: isActive
                        ? Theme.of(context).scaffoldBackgroundColor.withOpacity(0.5)
                        : Colors.transparent,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Row(
                    children: [
                      Icon(
                        _icons[index],
                        size: 24,
                      ),
                      AnimatedSize(
                        duration: const Duration(milliseconds: 300),
                        curve: Curves.easeInOut,
                        child: SizedBox(
                          width: isActive ? 8 : 0,
                        ),
                      ),
                      AnimatedOpacity(
                        opacity: isActive ? 1.0 : 0.0,
                        duration: const Duration(milliseconds: 300),
                        child: isActive
                            ? Text(
                                _labels[index],
                                style: const TextStyle(
                                  fontWeight: FontWeight.w500,
                                  fontSize: 14,
                                ),
                              )
                            : const SizedBox.shrink(),
                      ),
                    ],
                  ),
                ),
              );
            }),
          ),
        ),
      );
  }
}