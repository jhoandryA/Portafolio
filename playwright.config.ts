import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";

const baseURL = process.env.E2E_BASE_URL || "http://127.0.0.1:3100";
const executablePath =
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
  (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined);

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 35000,
  expect: { timeout: 10000 },
  reporter: "list",
  outputDir: ".playwright/results",
  use: {
    baseURL,
    viewport: { width: 1440, height: 1000 },
    locale: "es-PE",
    timezoneId: "America/Lima",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    launchOptions: {
      executablePath,
      args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
    },
  },
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command:
          "npm run build && npm run start -- --hostname 127.0.0.1 --port 3100",
        url: baseURL,
        timeout: 120000,
        reuseExistingServer: false,
      },
});
