import { useCallback  } from "react";
import { commands } from "@/bindings";
import {  ClipboardContent } from "@/types/clipboard";

export const useClipboard = () => {
  const read = useCallback(async (): Promise<string> => {
    const result = await commands.readClipboard();
    if (result.status === "ok") {
      return result.data || "";
    }

    return "";
  }, []);

  const readContent = useCallback(async (): Promise<ClipboardContent> => {
    const text = await read();
    if (text) {
      return { type: "text", text };
    }

    return { type: "empty" };
  }, [read]);

  const writeTextToClipboard = useCallback(
    async (text: string) => {
      const result = await commands.writeClipboard(text);
      if (result.status === "ok") {
        return;
      }

      throw result.error;
    },
    [],
  );

  const writeImageToClipboard = useCallback(
    async (base64ImageData: string) => {
      //@ts-ignore
      const { status, error } = await commands.writeClipboardImage(base64ImageData);
      if (status === 'ok') return

      throw error;
    },
    [],
  );

  const reinitialize = useCallback(async (): Promise<void> => {
    const result = await commands.reinitializeClipboard();
    if (result.status === "ok") {
      return;
    }

    throw result.error;
  }, []);

  return {
    read,
    readContent,
    writeTextToSystemClipboard: writeTextToClipboard,
    writeImageToSystemClipboard: writeImageToClipboard,
    reinitialize,
  };
};
