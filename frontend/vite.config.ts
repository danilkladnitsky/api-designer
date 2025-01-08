import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": "/src",
            "shared": "../../../shared-types"
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                  @use "@/ui/styles/colors.scss" as *;
                  @use "@/ui/styles/fonts.scss" as *;
                  @use "@/ui/styles/variables.scss" as *;
                `
            }
        }
    }
})
