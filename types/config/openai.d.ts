
export declare namespace OpenAI {
  
  interface Configure {
    /**
     * 默认 API Key 别名
     */
    apiKeyName       : string
    /**
     * OpenAI BaseURL
     */
    baseUrl         ?: string
    /**
     * OpenAI API Keys
     */
    apiKeys          : Array<{name: string, value: string}>
  }
}