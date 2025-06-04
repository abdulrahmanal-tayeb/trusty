import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:trusty/features/history/presentation/screens/history_screen.dart';
import 'package:trusty/features/home/presentation/screens/home_screen.dart';
import 'package:trusty/features/humanizer/presentation/screens/analysis_screen.dart';
import 'package:trusty/providers/user_input_provider.dart';

final appRouter = GoRouter(
  initialLocation: "/",
  routes: [
    GoRoute(
      path: "/",
      name: "home",
      builder: (context, state) => HomeScreen()
    ),
    GoRoute(
      path: "/analysis",
      name: "analysis",
      builder: (context, state) => AnalysisScreen()
    ),
  ]
);