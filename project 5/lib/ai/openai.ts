import OpenAI from 'openai';
import { AI_CONFIG } from './config';
import type { AIAnalysisResult, OutfitSuggestion } from '@/types/models';

// Mock API key for development
const API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY || 'mock-api-key';

const openai = new OpenAI({
  apiKey: API_KEY,
});

export class OpenAIService {
  private static instance: OpenAIService;
  
  private constructor() {}
  
  static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  async analyzeImage(imageBase64: string): Promise<AIAnalysisResult> {
    // If using mock API key, return mock data
    if (API_KEY === 'mock-api-key') {
      console.log('Using mock data for image analysis');
      return this.getMockImageAnalysis();
    }
    
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { 
                type: "text", 
                text: "Analyze this clothing item and provide detailed information about its type, color, pattern, style, and season suitability. Format the response as JSON." 
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ],
          }
        ],
        max_tokens: 500,
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      console.error('Error analyzing image with GPT-4 Vision:', error);
      throw new Error('Failed to analyze image');
    }
  }

  async generateOutfitSuggestions(
    wardrobe: AIAnalysisResult[],
    occasion: string,
    weather: string
  ): Promise<OutfitSuggestion[]> {
    // If using mock API key, return mock data
    if (API_KEY === 'mock-api-key') {
      console.log('Using mock data for outfit suggestions');
      return this.getMockOutfitSuggestions();
    }
    
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a professional fashion stylist AI. Create outfit combinations based on the following criteria:
              - Style compatibility
              - Color harmony
              - Season and weather appropriateness
              - Occasion suitability
              Format the response as JSON array of outfit suggestions.`
          },
          {
            role: "user",
            content: JSON.stringify({
              wardrobe,
              occasion,
              weather,
              stylePreferences: AI_CONFIG.STYLE_ANALYSIS.styleCategories,
              colorPalettes: AI_CONFIG.COLOR_ANALYSIS.colorPalettes
            })
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      return JSON.parse(response.choices[0].message.content || '[]');
    } catch (error) {
      console.error('Error generating outfit suggestions:', error);
      throw new Error('Failed to generate outfit suggestions');
    }
  }
  
  // Mock data for development
  private getMockImageAnalysis(): AIAnalysisResult {
    return {
      detectedItems: [
        {
          id: '1',
          type: 'top',
          category: 'shirts',
          color: 'blue',
          pattern: 'solid',
          season: 'summer',
          style: ['casual', 'minimal'],
          imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
          confidence: 0.95
        }
      ],
      styleAnalysis: {
        dominantStyle: 'casual',
        confidence: 0.92,
        alternativeStyles: ['minimal', 'streetwear']
      },
      colorAnalysis: {
        dominantColors: ['blue', 'white'],
        colorScheme: 'cool'
      }
    };
  }
  
  private getMockOutfitSuggestions(): OutfitSuggestion[] {
    return [
      {
        id: '1',
        items: [
          {
            id: '1',
            type: 'top',
            category: 'shirts',
            color: 'blue',
            pattern: 'solid',
            season: 'summer',
            style: ['casual'],
            imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
            confidence: 0.95
          },
          {
            id: '2',
            type: 'bottom',
            category: 'jeans',
            color: 'dark blue',
            pattern: 'solid',
            season: 'fall',
            style: ['casual'],
            imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80',
            confidence: 0.93
          },
          {
            id: '3',
            type: 'shoes',
            category: 'sneakers',
            color: 'white',
            pattern: 'solid',
            season: 'summer',
            style: ['casual', 'sporty'],
            imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80',
            confidence: 0.9
          }
        ],
        style: 'casual',
        occasion: 'daily',
        confidence: 0.92,
        weatherCompatible: true,
        colorHarmony: 0.85
      },
      {
        id: '2',
        items: [
          {
            id: '4',
            type: 'outerwear',
            category: 'blazers',
            color: 'navy',
            pattern: 'solid',
            season: 'fall',
            style: ['formal', 'business'],
            imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80',
            confidence: 0.88
          },
          {
            id: '5',
            type: 'top',
            category: 'shirts',
            color: 'white',
            pattern: 'solid',
            season: 'spring',
            style: ['formal', 'business'],
            imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80',
            confidence: 0.92
          },
          {
            id: '6',
            type: 'bottom',
            category: 'pants',
            color: 'gray',
            pattern: 'solid',
            season: 'fall',
            style: ['formal', 'business'],
            imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80',
            confidence: 0.9
          },
          {
            id: '7',
            type: 'shoes',
            category: 'dress shoes',
            color: 'black',
            pattern: 'solid',
            season: 'fall',
            style: ['formal', 'business'],
            imageUrl: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500&q=80',
            confidence: 0.94
          }
        ],
        style: 'formal',
        occasion: 'business',
        confidence: 0.88,
        weatherCompatible: true,
        colorHarmony: 0.9
      }
    ];
  }
}