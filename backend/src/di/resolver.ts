import { container } from "./container";

export const resolve = <T>(identifier: symbol): T =>
    container.get<T>(identifier);