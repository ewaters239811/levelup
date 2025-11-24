import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { archetypes } from '@/data/archetypes';
import { archetypeIntroClasses } from '@/data/archetypeIntroClasses';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const { email, archetypeKey } = await request.json();

    if (!email || !archetypeKey) {
      return NextResponse.json(
        { error: 'Email and archetype are required' },
        { status: 400 }
      );
    }

    if (!resend) {
      console.warn('RESEND_API_KEY not configured - email sending disabled');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 503 }
      );
    }

    const archetype = archetypes[archetypeKey];
    const introClass = archetypeIntroClasses[archetypeKey];

    if (!archetype) {
      return NextResponse.json(
        { error: 'Invalid archetype' },
        { status: 400 }
      );
    }

    // Build email content
    const mainBlocksHtml = archetype.mainBlocks
      .map((block, i) => `<li style="margin-bottom: 12px; color: #d4d4d8;">${i + 1}. ${block}</li>`)
      .join('');

    const weeklyMovesHtml = archetype.weeklyMoves
      .map((move) => `<li style="margin-bottom: 12px; color: #d4d4d8;">→ ${move}</li>`)
      .join('');

    const bibleVersesHtml = archetype.bibleVerses
      .map((verse) => `<div style="margin-bottom: 16px; padding: 16px; border-left: 3px solid #06b6d4; background-color: #1a1a1a; color: #d4d4d8; font-style: italic;">${verse}</div>`)
      .join('');

    let introClassHtml = '';
    if (introClass && introClass.lessons.length > 0) {
      introClassHtml = `
        <div style="margin-top: 40px; padding-top: 40px; border-top: 1px solid #262626;">
          <h2 style="color: #ffffff; font-size: 24px; font-weight: 300; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.1em;">Your Intro Class</h2>
          <p style="color: #a3a3a3; margin-bottom: 32px; font-size: 16px;">A spiritual and psychological orientation to your archetype</p>
      `;

      introClass.lessons.forEach((lesson, index) => {
        const reflectionQuestionsHtml = lesson.reflectionQuestions
          ? lesson.reflectionQuestions.map(q => `<li style="margin-bottom: 12px; color: #d4d4d8; padding: 12px; background-color: #1a1a1a; border-left: 2px solid #06b6d4;">${q}</li>`).join('')
          : '';

        const dailyPracticesHtml = lesson.dailyPractices
          ? lesson.dailyPractices.map(p => `<li style="margin-bottom: 12px; color: #d4d4d8;">→ ${p}</li>`).join('')
          : '';

        introClassHtml += `
          <div style="margin-bottom: 48px; padding-bottom: 32px; border-bottom: 1px solid #262626;">
            <div style="margin-bottom: 16px;">
              <span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.2em;">Lesson ${index + 1} of ${introClass.lessons.length}</span>
            </div>
            <h3 style="color: #ffffff; font-size: 28px; font-weight: 300; margin-bottom: 8px;">${lesson.title}</h3>
            ${lesson.subtitle ? `<p style="color: #a3a3a3; font-size: 18px; font-style: italic; margin-bottom: 24px;">${lesson.subtitle}</p>` : ''}
            <div style="color: #d4d4d8; line-height: 1.8; margin-bottom: 24px;">
              ${lesson.content.split('\n\n').map((paragraph: string) => `<p style="margin-bottom: 16px; margin-top: 0;">${paragraph.trim()}</p>`).join('')}
            </div>
            ${reflectionQuestionsHtml ? `
              <div style="margin-top: 32px;">
                <h4 style="color: #ffffff; font-size: 18px; font-weight: 300; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px;">Reflection Questions</h4>
                <ul style="list-style: none; padding: 0;">${reflectionQuestionsHtml}</ul>
              </div>
            ` : ''}
            ${dailyPracticesHtml ? `
              <div style="margin-top: 32px;">
                <h4 style="color: #ffffff; font-size: 18px; font-weight: 300; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px;">Daily Practices</h4>
                <ul style="list-style: none; padding: 0;">${dailyPracticesHtml}</ul>
              </div>
            ` : ''}
            ${lesson.completionMarker ? `
              <div style="margin-top: 24px; padding: 16px; background-color: #1a1a1a; border-left: 3px solid #06b6d4;">
                <p style="color: #06b6d4; font-style: italic; margin: 0;">${lesson.completionMarker}</p>
              </div>
            ` : ''}
          </div>
        `;
      });

      introClassHtml += '</div>';
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #0a0a0a;">
            <div style="text-align: center; margin-bottom: 40px;">
              <p style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.3em; margin-bottom: 8px;">ELIJAH PRESENTS</p>
              <p style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 24px;">Your Dominant Pattern</p>
            </div>
            
            <h1 style="color: #ffffff; font-size: 42px; font-weight: 300; text-align: center; margin-bottom: 16px; line-height: 1.1;">${archetype.name}</h1>
            <p style="color: #a3a3a3; font-size: 20px; text-align: center; font-style: italic; margin-bottom: 40px;">${archetype.tagline}</p>
            
            <div style="color: #d4d4d8; line-height: 1.8; margin-bottom: 40px; font-size: 16px;">
              ${archetype.description}
            </div>

            <div style="margin-top: 40px; padding-top: 40px; border-top: 1px solid #262626;">
              <h2 style="color: #ffffff; font-size: 24px; font-weight: 300; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.1em;">What's Holding You Back</h2>
              <ul style="list-style: none; padding: 0; margin: 0;">
                ${mainBlocksHtml}
              </ul>
            </div>

            <div style="margin-top: 40px; padding-top: 40px; border-top: 1px solid #262626;">
              <h2 style="color: #ffffff; font-size: 24px; font-weight: 300; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.1em;">This Week's Moves</h2>
              <ul style="list-style: none; padding: 0; margin: 0;">
                ${weeklyMovesHtml}
              </ul>
            </div>

            <div style="margin-top: 40px; padding-top: 40px; border-top: 1px solid #262626;">
              <h2 style="color: #ffffff; font-size: 24px; font-weight: 300; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.1em;">Scripture for Reflection</h2>
              ${bibleVersesHtml}
            </div>

            ${introClassHtml}

            <div style="margin-top: 40px; padding-top: 40px; border-top: 1px solid #262626; text-align: center;">
              <p style="color: #71717a; font-size: 14px; font-style: italic; margin: 0;">
                You're not broken. You're just patterned. Patterns can be rewritten.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Level-Up Diagnostic <onboarding@resend.dev>',
      to: email,
      subject: `Your ${archetype.name} Results`,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend error:', error);
      // Provide more helpful error messages
      let errorMessage = 'Failed to send email';
      if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      return NextResponse.json(
        { 
          error: errorMessage,
          details: process.env.NODE_ENV === 'development' ? error : undefined
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

