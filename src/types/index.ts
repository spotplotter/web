export interface Prediction {
  predicted_class: string;
  confidence: number;
}

export interface InferenceResponse {
  predictions: Prediction[];
  best_prediction: Prediction;
}
