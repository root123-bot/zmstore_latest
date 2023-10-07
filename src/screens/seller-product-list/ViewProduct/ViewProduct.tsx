import React from "react";
import { Box } from "native-base";
import { ScreenTitleContainer } from "@src/components/ScreenTitleContainer";

export const ViewProduct = ({ navigation }) => {
    // const [productId, setProductId] = useState(route.params?.productId);

    const props = {
        leftIcon: "arrow-left",
        handleCancel: () => navigation.goBack(),
        title: "Product Preview",
        isViewProduct: true,
        rightIcon: "menu-extra-large"
    }

    return (
        <Box flex={1} safeArea>
            <Box>
                <ScreenTitleContainer {...props} />
            </Box>
        </Box>
    )
}