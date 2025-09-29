# Intuition App - Use Case Ideation

## Actors Identification

### Primary Actors
1. **User** - Main app user training their intuition
2. **Premium User** - Subscribed user with additional features
3. **Admin** - App administrator managing content and users

### Secondary Actors
4. **Payment System** (Superwall) - External payment processor
5. **Social Media Platforms** - For sharing achievements
6. **Analytics System** - For tracking and insights
7. **Notification Service** - For push notifications

## Core Use Cases by Category

### 1. User Onboarding & Authentication
- Register Account
- Login/Logout
- Complete Onboarding Assessment
- View Personalized Learning Path
- Reset Password

### 2. Minigame Training
- Play Pattern Recognition Games
- Play Social Intuition Games  
- Play Decision Making Games
- Play Creative Intuition Games
- Pause/Resume Games
- View Game Results
- Get Hints
- Adjust Difficulty Level

### 3. Progress Tracking & Analytics
- View Overall Intuition Score
- View Category-Specific Scores
- Track Daily/Weekly Progress
- Set Goals
- View Performance Trends
- Get Personalized Recommendations
- Track Streaks

### 4. Social Features
- View Global Leaderboard
- Add/Remove Friends
- View Friend Rankings
- Join Challenges
- Create Custom Challenges
- Share Achievements
- Participate in Tournaments

### 5. Subscription Management
- View Subscription Options
- Subscribe to Premium
- Manage Subscription
- Access Premium Features
- Cancel Subscription

### 6. Real-World Application
- Complete Daily Challenges
- Track Real-World Success
- Get Application Tips
- Practice Scenarios

## Two Use Case Diagram Focus Areas

### **Diagram 1: Core Training & Progress System**
**Focus**: The main training loop and progress tracking
**Primary Actor**: User
**Key Use Cases**:
- Complete Onboarding
- Play Minigames (various types)
- View Progress & Analytics
- Set Goals
- Get Recommendations

### **Diagram 2: Social & Premium Features**
**Focus**: Social interactions and premium functionality  
**Primary Actors**: User, Premium User, Payment System
**Key Use Cases**:
- Manage Subscription
- Access Premium Features
- Social Interactions (Friends, Leaderboards)
- Participate in Challenges
- Share Achievements

## Detailed Use Case Breakdown

### Diagram 1 Use Cases:

#### **Complete Onboarding**
- **Actor**: User
- **Precondition**: User has registered
- **Flow**: Take assessment → View results → See personalized path
- **Postcondition**: User has customized experience

#### **Play Pattern Recognition Game**
- **Actor**: User  
- **Precondition**: User is logged in
- **Flow**: Select game → Choose difficulty → Play → View results
- **Extensions**: Use hints, pause game
- **Postcondition**: Score recorded, progress updated

#### **Play Social Intuition Game**
- **Actor**: User
- **Similar flow to pattern recognition but with social scenarios**

#### **Play Decision Making Game**  
- **Actor**: User
- **Focus on risk assessment and gut check scenarios**

#### **View Progress Analytics**
- **Actor**: User
- **Flow**: Access dashboard → View scores → See trends → Get insights
- **Postcondition**: User understands their development

#### **Set Training Goals**
- **Actor**: User
- **Flow**: Choose goal type → Set target → Track progress
- **Postcondition**: Goal is active and being tracked

### Diagram 2 Use Cases:

#### **Subscribe to Premium**
- **Actor**: User, Payment System
- **Flow**: View plans → Select plan → Process payment → Activate features
- **Postcondition**: User has premium access

#### **Access Premium Features**
- **Actor**: Premium User
- **Flow**: Verify subscription → Access exclusive content
- **Includes**: Premium games, advanced analytics, unlimited practice

#### **View Global Leaderboard**
- **Actor**: User
- **Flow**: Access leaderboard → Filter by category → View rankings
- **Postcondition**: User sees competitive standing

#### **Add Friends**
- **Actor**: User
- **Flow**: Search users → Send request → Accept/Reject
- **Postcondition**: Friend connection established

#### **Join Challenge**
- **Actor**: User
- **Flow**: Browse challenges → Join → Compete → View results
- **Postcondition**: User participates in competition

#### **Share Achievement**
- **Actor**: User, Social Media Platforms
- **Flow**: Earn achievement → Choose sharing platform → Post
- **Postcondition**: Achievement shared publicly

## Use Case Relationships

### **Include Relationships**:
- Play Minigame **includes** Record Score
- View Progress **includes** Calculate Trends
- Subscribe **includes** Process Payment

### **Extend Relationships**:
- Play Minigame **extends** Use Hint (optional)
- Play Minigame **extends** Pause Game (optional)  
- View Leaderboard **extends** Filter by Category (optional)

### **Generalization**:
- Play Pattern Game **generalizes** Play Minigame
- Play Social Game **generalizes** Play Minigame
- Play Decision Game **generalizes** Play Minigame

## System Boundaries

### **Diagram 1 Boundary**: Core Training System
- Includes: Onboarding, Minigames, Progress Tracking, Goals
- Excludes: Social features, payments, external integrations

### **Diagram 2 Boundary**: Social & Premium System  
- Includes: Subscriptions, Social features, Premium content, External integrations
- Excludes: Basic training functionality

## Next Steps
1. Create detailed use case specifications
2. Design the two use case diagrams with proper UML notation
3. Add system boundaries and actor relationships
4. Include use case relationships (include, extend, generalize)
