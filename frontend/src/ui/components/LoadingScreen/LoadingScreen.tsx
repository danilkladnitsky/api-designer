import { Box, Loader, LoaderProps } from "@gravity-ui/uikit"

interface Props extends LoaderProps {
    className?: string
}

export const LoadingScreen = ({ className, ...loaderProps }: Props) => {
    return (
        <Box className={className}>
            <Loader size="l" {...loaderProps} />
        </Box>
    )
}
