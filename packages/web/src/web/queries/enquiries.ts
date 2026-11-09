import { useMutation } from "@tanstack/react-query";
import { orpc } from "../lib/api";

export function useCreateEnquiry() {
  return useMutation(orpc.enquiries.create.mutationOptions());
}
export function useTrackEnquiry() {
  return useMutation(orpc.enquiries.track.mutationOptions());
}
