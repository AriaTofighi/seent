// Exclude keys from an object
export function exclude<Model, Key extends keyof Model>(
  object: Model,
  ...keys: Key[]
) {
  for (const key of keys) {
    delete object[key];
  }
  return object;
}
