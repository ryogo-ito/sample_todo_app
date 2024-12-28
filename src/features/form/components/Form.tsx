import React from 'react';
import {
  Box,
  Button,
  Center,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps,
  VStack,
} from '@chakra-ui/react';
import { BasicStep } from './BasicStep';
import { OptionalStep } from './OptionalStep';

const steps = [
  {
    title: 'Step1',
    description: '基本情報',
  },
  {
    title: 'Step2',
    description: '任意情報',
  },
  { title: 'Step3', description: '確認' },
];

const component: { [key: number]: JSX.Element } = {
  1: <BasicStep />,
  2: <OptionalStep />,
};

export function Form() {
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  return (
    <>
      <Stepper index={activeStep} padding={4}>
        {steps.map((step, idx) => (
          <Step key={idx}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <Center>
        <Box width={780}>
          <VStack spacing={2}>
            {component[activeStep]}
            <Button onClick={handleNext}>次へ</Button>
          </VStack>
        </Box>
      </Center>
    </>
  );
}
