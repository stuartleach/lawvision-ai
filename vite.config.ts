import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths({
            root: './', // Ensure this is correct relative to your tsconfig.json
        }),
    ],
    resolve: {
        alias: {
            $lib: path.resolve(__dirname, 'src/lib'),
            $components: path.resolve(__dirname, 'src/lib/components'),
            $data: path.resolve(__dirname, 'src/lib/stores/data'),
            $types: path.resolve(__dirname, 'src/lib/types'),
            $api: path.resolve(__dirname, 'src/lib/api'),
            $utils: path.resolve(__dirname, 'src/lib/misc.ts'),
            $assets: path.resolve(__dirname, 'src/lib/assets'),
            '@': path.resolve(__dirname, 'src'), // Alias for the src directory
        },
    },
});
