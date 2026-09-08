import { useEffect, useRef } from "react";
import { displaySocket } from "../../../lib/socket";
import type {
  DisplayPatient,
  DisplayQueueSnapshot,
} from "../../../types/token";

interface UseDisplaySocketProps {
  onUpdated: (snapshot: DisplayQueueSnapshot) => void;
  onRecalled?: (patient: DisplayPatient) => void;
}

export const useDisplaySocket = ({
  onUpdated,
  onRecalled,
}: UseDisplaySocketProps) => {
  const onUpdatedRef = useRef(onUpdated);
  const onRecalledRef = useRef(onRecalled);

  useEffect(() => {
    onUpdatedRef.current = onUpdated;
  }, [onUpdated]);

  useEffect(() => {
    onRecalledRef.current = onRecalled;
  }, [onRecalled]);

  useEffect(() => {
    const handleUpdated = (
      snapshot: DisplayQueueSnapshot,
    ) => {
      onUpdatedRef.current(snapshot);
    };

    const handleRecalled = (
      patient: DisplayPatient,
    ) => {
      onRecalledRef.current?.(patient);
    };

    displaySocket.off(
      "display:updated",
      handleUpdated,
    );

    displaySocket.off(
      "display:recalled",
      handleRecalled,
    );

    displaySocket.on(
      "display:updated",
      handleUpdated,
    );

    displaySocket.on(
      "display:recalled",
      handleRecalled,
    );

    if (!displaySocket.connected) {
      displaySocket.connect();
    }

    return () => {
      displaySocket.off(
        "display:updated",
        handleUpdated,
      );

      displaySocket.off(
        "display:recalled",
        handleRecalled,
      );

      
    };
  }, []);
};