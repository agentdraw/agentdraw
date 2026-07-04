import { forwardRef, useImperativeHandle } from "react";
import { ExcalidrawBoard } from "./excalidraw/ExcalidrawBoard";
import type { BoardHandle, BoardProviderProps, BoardSnapshot } from "./types";

export const BoardRenderer = forwardRef<BoardHandle, BoardProviderProps>((props, ref) => {
  const providerId = props.scene.providerId ?? "excalidraw";

  if (providerId === "excalidraw") {
    return <ExcalidrawBoard ref={ref} {...props} />;
  }

  return <UnsupportedBoardProvider ref={ref} {...props} />;
});

const UnsupportedBoardProvider = forwardRef<BoardHandle, BoardProviderProps>(
  ({ scene }, ref) => {
    useImperativeHandle(ref, () => ({
      getSnapshot: () => scene,
      setStyleDefaults: () => null,
      applyStyleToBoard: () => null,
      exportPng: async () => undefined,
      exportSvg: async () => undefined,
    }));

    return (
      <div className="board-placeholder">
        <div>
          <h2>Unsupported provider</h2>
          <p>
            This file uses provider <code>{scene.providerId ?? "unknown"}</code>. This AgentDraw
            build can open Excalidraw boards only.
          </p>
        </div>
      </div>
    );
  },
);

export const snapshotProvider = (snapshot: BoardSnapshot) => snapshot.providerId ?? "excalidraw";
