export interface UserInfoSchema {
  age: { type: Number; required: true };
  weight: { type: Number; required: true };
  height: { type: Number; required: true };
  gender: { type: Boolean; default: true }; // true = male, false = female
  activityLevel: {
    type: String;
    enum: ['low', 'medium', 'high'];
    required: true;
  };
  goal: { type: Number; goals: Enumerator; required: true };
  calories?: { type: Number; require: false };
}
