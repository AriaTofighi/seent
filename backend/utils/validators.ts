import { Transform } from "class-transformer";
import { IsBoolean as CVIsBoolean } from "class-validator";

// NOT TESTED
export function IsBoolean(target: any, propertyName: string) {
  CVIsBoolean()(target, propertyName);
  Transform(({ value }) => value === "true")(target, propertyName);
}
