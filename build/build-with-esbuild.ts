import esbuild from "esbuild";
import config from "./esbuild.config";

async function runBuild() {
  try {
    const result = await esbuild.build(config);
    console.log("Build completed", result);
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

runBuild();
