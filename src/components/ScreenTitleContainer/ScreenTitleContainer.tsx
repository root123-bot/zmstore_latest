import React from "react"
import {
    Flex,
    Box,
    Pressable,
    Center,
    Heading
} from 'native-base'
import { Icon } from '@components/icon';


interface ScreenTitleProps {
    handleCancel: () => {},
    leftIcon: string,
    rightIcon?: string,
    title: string,
    isViewProduct?: boolean
}

export function ScreenTitleContainer({ handleCancel, leftIcon, title, isViewProduct, rightIcon }: ScreenTitleProps) {
    return (
        <Flex flexDirection={'row'} alignItems='center' px={2} pt={5}>
            <Box>
                <Pressable onPress={handleCancel}>
                    <Icon name={leftIcon} size={20} />
                </Pressable>
            </Box>
            <Center flex={1}>
                <Heading size='sm'>
                    {title}
                </Heading>
            </Center>
            {
                isViewProduct && (
                    <Box>
                        <Pressable onPress={handleCancel}>
                            <Icon name={rightIcon} size={20} />
                        </Pressable>
                    </Box>
                )
            }

        </Flex>
    )
}