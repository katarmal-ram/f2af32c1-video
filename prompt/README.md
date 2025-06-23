
# AI Website Generation Prompt Templates

This folder contains comprehensive JSON templates with embedded AI generation prompts for creating dynamic, industry-specific websites.

## File Structure

- `config-prompt.json` - Global site configuration template
- `home-prompt.json` - Home page content template
- `about-prompt.json` - About page content template  
- `services-prompt.json` - Services page content template
- `products-prompt.json` - Products page content template
- `contact-prompt.json` - Contact page content template

## How to Use

1. **Choose Industry Context**: Replace `{industry}`, `{company}`, and other placeholders with specific business context
2. **Process Prompts**: Replace all `[PROMPT]` sections with AI-generated content based on the instructions
3. **Scale Content**: Add or remove items in arrays based on company size and offerings
4. **Maintain Consistency**: Ensure data consistency across all files (company name, contact info, etc.)

## Prompt Processing Instructions

### For AI Content Generation:
- `[PROMPT]` sections contain specific instructions for content generation
- Follow the tone and style guidelines in each template
- Maintain professional, industry-appropriate language
- Ensure factual consistency across all generated content

### Scalability Guidelines:
- **Why Choose Us**: 3-6 items
- **Industry Expertise**: 4-12 sectors
- **Services**: 3-10 services
- **Product Categories**: 3-15 categories
- **Products per Category**: 2-20 products
- **Testimonials**: 2-20 testimonials
- **Company Journey**: 3-10 milestones
- **Awards**: 2-8 awards
- **FAQs**: 3-15 questions

### Content Quality Standards:
- Use realistic, industry-appropriate metrics
- Ensure technical accuracy for specifications
- Maintain consistent brand voice throughout
- Include proper SEO optimization
- Follow accessibility best practices

## Example Usage

```bash
# Replace placeholders with actual values
industry="brass manufacturing"
company="Ashapura Brass Industries"
location="Jamnagar, Gujarat, India"

# Process each template file through AI with context
# Generate final JSON files in /public/pages/ directory
```

## Template Features

- **SEO Optimized**: Meta titles and descriptions included
- **Responsive Content**: Scalable sections based on company size
- **Industry Agnostic**: Adaptable to any manufacturing/service industry
- **Professional Tone**: Business-appropriate language and messaging
- **Comprehensive Coverage**: All essential business aspects included
- **Technical Accuracy**: Industry-specific terminology and specifications
- **User Experience**: Customer-focused content and calls-to-action

## Quality Checklist

- [ ] All placeholders replaced with realistic content
- [ ] Contact information consistent across all files
- [ ] Industry terminology accurate and appropriate
- [ ] SEO titles under 60 characters
- [ ] Meta descriptions under 160 characters
- [ ] Professional tone maintained throughout
- [ ] Technical specifications realistic and accurate
- [ ] Call-to-actions compelling and relevant
- [ ] Images URLs from appropriate sources
- [ ] Content scales appropriately for company size
