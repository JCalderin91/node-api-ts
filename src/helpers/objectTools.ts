export const removeFinishWith = (object: Record<string, any>, text: string) => {
  return Object.keys(object).reduce(
    (newObject: Record<string, any>, key: string) => {
      if (!key.endsWith(text)) return { ...newObject, [key]: object[key] };
      return newObject;
    },
    {}
  );
};
