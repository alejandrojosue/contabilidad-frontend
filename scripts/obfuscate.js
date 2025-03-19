import fs from "fs";
import path from "path";
import JavaScriptObfuscator from "javascript-obfuscator";

const buildDir = "./dist/client/_astro"; // Directorio donde Astro genera los archivos

function obfuscateFiles(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      obfuscateFiles(filePath);
    } else if (file.endsWith(".js")) {
      console.log(`🔒 Ofuscando: ${filePath}`);

      const code = fs.readFileSync(filePath, "utf8");
      const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        controlFlowFlattening: true,
      }).getObfuscatedCode();

      fs.writeFileSync(filePath, obfuscatedCode);
    }
  });
}

obfuscateFiles(buildDir);
console.log("✅ Código ofuscado correctamente.");
