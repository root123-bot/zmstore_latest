import React, { ReactElement } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { customTheme } from '@src/theme';

export interface StepperProps {
  active: number;
  content: ReactElement[];
  onNext?(): void;
  onBack?(): void;
  onFinish?(): void;
  wrapperStyle?: ViewStyle;
  stepStyle?: ViewStyle;
  stepLine?: ViewStyle;
  stepTextStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  showButton?: boolean;
}

export function Stepper({
  active,
  content,
  onBack,
  onNext,
  onFinish,
  wrapperStyle,
  stepLine,
  stepStyle,
  stepTextStyle,
  buttonStyle,
  buttonTextStyle,
  showButton = false,
}: StepperProps) {
  return (
    <View style={wrapperStyle}>
      <View style={styles.stepLayout}>
        {content.map((_, i) => {
          return (
            <React.Fragment key={i}>
              {i !== 0 && <View style={stepLine || styles.stepLine} />}
              <View style={stepStyle || styles.stepStyle}>
                {i < active ? (
                  <Text
                    style={stepTextStyle || styles.stepTextStyle}
                    testID='checkIcon'>
                    &#10003;
                  </Text>
                ) : (
                  <Text style={stepTextStyle || styles.stepTextStyle}>
                    {i + 1}
                  </Text>
                )}
              </View>
            </React.Fragment>
          );
        })}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.contentLayout}>
        {content[active]}
      </ScrollView>

      {showButton && (
        <View style={styles.buttonLayout}>
          {active !== 0 && (
            <TouchableOpacity
              style={buttonStyle || styles.buttonStyle}
              onPress={onBack}>
              <Text style={buttonTextStyle || styles.buttonTextStyle}>
                Back
              </Text>
            </TouchableOpacity>
          )}
          {content.length - 1 !== active && (
            <TouchableOpacity
              style={buttonStyle || styles.buttonStyle}
              onPress={onNext}>
              <Text style={buttonTextStyle || styles.buttonTextStyle}>
                Next
              </Text>
            </TouchableOpacity>
          )}
          {content.length - 1 === active && (
            <TouchableOpacity
              style={buttonStyle || styles.buttonStyle}
              onPress={onFinish}>
              <Text style={buttonTextStyle || styles.buttonTextStyle}>
                Finish
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  stepLayout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepLine: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: customTheme.colors.secondary[500],
    borderStyle: 'dashed',
    marginHorizontal: 10,
  },
  stepStyle: {
    backgroundColor: customTheme.colors.secondary[500],
    width: 25,
    height: 25,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepTextStyle: {
    color: 'white',
  },
  contentLayout: {
    marginTop: 20,
  },
  buttonLayout: {
    flexDirection: 'row',
  },
  buttonStyle: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: customTheme.colors.secondary[500],
    alignSelf: 'flex-start',
    marginRight: 10,
  },
  buttonTextStyle: {
    color: 'white',
  },
});
