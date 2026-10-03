export const REGISTRATION_STATUSES = ['New', 'Contacted', 'Enrolled', 'Closed'] as const;
export const INQUIRY_STATUSES = ['New', 'Replied', 'Closed'] as const;
/** Topics offered on the contact form (values from the design's select). */
export const INQUIRY_TOPICS = { general: 'General question', programs: 'Programs & courses', schedule: 'Schedules', registration: 'Registration' } as const;
export const UNSURE = 'unsure';
/** Card tints from the design palette, cycled for new programs. */
export const TINTS = ['#DDEFFC', '#DDF3E8', '#FCE6DF', '#F3EBDD'];
