import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Theme as ThemeTypes, useTheme } from "@/components/theme-provider";

interface ThemeProps {
  theme: ThemeTypes;
}

export default function SetTheme({ theme }: ThemeProps) {
  const { theme: currentTheme, setTheme } = useTheme();

  const buttonThemeStyle =
    "w-12 h-12 rounded-md flex items-center justify-center hover:bg-accent/50 transition-colors";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {theme === "default" && (
            <div
              className={`${buttonThemeStyle} ${
                currentTheme === "default"
                  ? "bg-accent/70 border-2 border-logo"
                  : "bg-accent/10"
              }`}
              onClick={() => setTheme(theme)}
            >
              <div
                className={`w-7 h-4 transition-all bg-[#7218EE] ${
                  currentTheme === "default"
                    ? "rounded-es-2xl rounded-se-2xl"
                    : "rounded-ss-2xl rounded-ee-2xl"
                }`}
              />
            </div>
          )}
          {theme === "blue" && (
            <div
              className={`${buttonThemeStyle} ${
                currentTheme === "blue"
                  ? "bg-accent/70 border-2 border-logo"
                  : "bg-accent/10"
              }`}
              onClick={() => setTheme(theme)}
            >
              <div
                className={`w-7 h-4 transition-all bg-[#3B82F6] ${
                  currentTheme === "blue"
                    ? "rounded-es-2xl rounded-se-2xl"
                    : "rounded-ss-2xl rounded-ee-2xl"
                }`}
              />
            </div>
          )}
          {theme === "green" && (
            <div
              className={`${buttonThemeStyle} ${
                currentTheme === "green"
                  ? "bg-accent/70 border-2 border-logo"
                  : "bg-accent/10"
              }`}
              onClick={() => setTheme(theme)}
            >
              <div
                className={`w-7 h-4 transition-all bg-[#22C55E] ${
                  currentTheme === "green"
                    ? "rounded-es-2xl rounded-se-2xl"
                    : "rounded-ss-2xl rounded-ee-2xl"
                }`}
              />
            </div>
          )}
          {theme === "orange" && (
            <div
              className={`${buttonThemeStyle} ${
                currentTheme === "orange"
                  ? "bg-accent/70 border-2 border-logo"
                  : "bg-accent/10"
              }`}
              onClick={() => setTheme(theme)}
            >
              <div
                className={`w-7 h-4 transition-all bg-[#EA580C] ${
                  currentTheme === "orange"
                    ? "rounded-es-2xl rounded-se-2xl"
                    : "rounded-ss-2xl rounded-ee-2xl"
                }`}
              />
            </div>
          )}
          {theme === "yellow" && (
            <div
              className={`${buttonThemeStyle} ${
                currentTheme === "yellow"
                  ? "bg-accent/70 border-2 border-logo"
                  : "bg-accent/10"
              }`}
              onClick={() => setTheme(theme)}
            >
              <div
                className={`w-7 h-4 transition-all bg-[#FACC15] ${
                  currentTheme === "yellow"
                    ? "rounded-es-2xl rounded-se-2xl"
                    : "rounded-ss-2xl rounded-ee-2xl"
                }`}
              />
            </div>
          )}
          {theme === "red" && (
            <div
              className={`${buttonThemeStyle} ${
                currentTheme === "red"
                  ? "bg-accent/70 border-2 border-logo"
                  : "bg-accent/10"
              }`}
              onClick={() => setTheme(theme)}
            >
              <div
                className={`w-7 h-4 transition-all bg-[#E11D48] ${
                  currentTheme === "red"
                    ? "rounded-es-2xl rounded-se-2xl"
                    : "rounded-ss-2xl rounded-ee-2xl"
                }`}
              />
            </div>
          )}
        </TooltipTrigger>
        <TooltipContent>{theme}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
