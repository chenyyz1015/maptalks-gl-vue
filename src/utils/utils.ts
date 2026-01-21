/**
 * 生成唯一ID
 * @returns {string} uid
 */
export function uuid(): string {
  return crypto.randomUUID();
}
