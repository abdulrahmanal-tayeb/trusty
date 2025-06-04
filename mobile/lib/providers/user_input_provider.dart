import 'package:flutter/material.dart';

enum UserInputField {
  text,
  tone,
  language,
  resultType
}

class UserInputProvider extends ChangeNotifier {
  String? text;
  String? tone;
  String? language;
  String? resultType;

  void setValue(UserInputField field, String? newValue, {bool notify = true}) {
    switch(field){
      case UserInputField.language:
        language = newValue;
        break;
      case UserInputField.resultType:
        resultType = newValue;
        break;
      case UserInputField.text:
        text = newValue;
        break;
      case UserInputField.tone:
        tone = newValue;
        break;
    }

    if(notify){
      notifyListeners();
    }
  }
}