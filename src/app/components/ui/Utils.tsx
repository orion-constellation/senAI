export const [isLoading, setIsLoading] = useState(false);

export const handleInput = async () => {
  setIsLoading(true);
  try {
    const analysisResult = await performAnalysis(selectedFunction);
    setResult(analysisResult);
  } catch (error) {
    console.error("Error during analysis", error);
  } finally {
    setIsLoading(false);
  }
};