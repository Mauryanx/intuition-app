# Lucidchart Manual Class Diagram Guide

## Step-by-Step Instructions for Creating the Class Diagram

### Step 1: Setup
1. Open Lucidchart → "New Document" → "UML Class Diagram"
2. From the left panel, you'll see "UML Class" shapes

### Step 2: Core Classes (Create these first)

#### User Class
1. Drag a "Class" shape to canvas
2. Double-click to edit
3. **Class Name**: User
4. **Attributes** (click + to add):
   - userId: String
   - email: String
   - username: String
   - password: String
   - createdAt: Date
   - lastLoginAt: Date
   - subscriptionStatus: SubscriptionType
   - profileImage: String
5. **Methods** (click + to add):
   - login()
   - logout()
   - register()
   - updateProfile()
   - resetPassword()

#### UserProfile Class
1. Drag another "Class" shape
2. **Class Name**: UserProfile
3. **Attributes**:
   - profileId: String
   - userId: String
   - firstName: String
   - lastName: String
   - dateOfBirth: Date
   - onboardingCompleted: Boolean
   - personalizedPath: LearningPath
4. **Methods**:
   - completeOnboarding()
   - updatePersonalizedPath()

#### Minigame Class
1. Drag another "Class" shape
2. **Class Name**: Minigame
3. **Attributes**:
   - gameId: String
   - gameName: String
   - gameType: MinigameType
   - description: String
   - instructions: String
   - difficultyLevels: List<DifficultyLevel>
   - intuitionCategory: IntuitionType
   - isPremium: Boolean
4. **Methods**:
   - startGame()
   - pauseGame()
   - resumeGame()
   - endGame()
   - calculateScore()

#### MinigameSession Class
1. Drag another "Class" shape
2. **Class Name**: MinigameSession
3. **Attributes**:
   - sessionId: String
   - userId: String
   - gameId: String
   - startTime: Date
   - endTime: Date
   - score: Integer
   - accuracy: Float
   - speed: Float
   - difficulty: DifficultyLevel
   - hintsUsed: Integer
   - completed: Boolean
4. **Methods**:
   - recordAnswer()
   - useHint()
   - calculateFinalScore()

#### UserProgress Class
1. Drag another "Class" shape
2. **Class Name**: UserProgress
3. **Attributes**:
   - progressId: String
   - userId: String
   - overallIntuitionScore: Integer
   - categoryScores: Map<IntuitionType, Integer>
   - totalGamesPlayed: Integer
   - currentStreak: Integer
   - longestStreak: Integer
   - lastActivityDate: Date
4. **Methods**:
   - updateScore()
   - incrementStreak()
   - resetStreak()
   - calculateImprovement()

#### Subscription Class
1. Drag another "Class" shape
2. **Class Name**: Subscription
3. **Attributes**:
   - subscriptionId: String
   - userId: String
   - planType: SubscriptionPlan
   - status: SubscriptionStatus
   - startDate: Date
   - endDate: Date
   - autoRenew: Boolean
   - paymentMethod: String
4. **Methods**:
   - upgrade()
   - downgrade()
   - cancel()
   - renew()
   - checkAccess()

### Step 3: Add Relationships
1. **User to UserProfile**: 
   - Use "Association" line (1-to-1)
   - Label: "has"

2. **User to MinigameSession**: 
   - Use "Association" line (1-to-many)
   - Label: "plays"

3. **User to UserProgress**: 
   - Use "Association" line (1-to-1)
   - Label: "tracks"

4. **User to Subscription**: 
   - Use "Association" line (1-to-1)
   - Label: "has"

5. **Minigame to MinigameSession**: 
   - Use "Association" line (1-to-many)
   - Label: "creates"

### Step 4: Layout Tips
1. **User class** at the center-top
2. **UserProfile** to the right of User
3. **MinigameSession** below User
4. **Minigame** to the left of MinigameSession
5. **UserProgress** below UserProfile
6. **Subscription** to the right of UserProgress

### Step 5: Styling
1. **Right-click** on classes → "Style" → Choose consistent colors
2. **Align classes** using alignment tools
3. **Adjust line routing** for clean connections

## Quick Copy-Paste Format for Each Class

### User
```
Attributes:
- userId: String
- email: String
- username: String
- password: String
- createdAt: Date
- lastLoginAt: Date
- subscriptionStatus: SubscriptionType
- profileImage: String

Methods:
+ login()
+ logout()
+ register()
+ updateProfile()
+ resetPassword()
```

### UserProfile
```
Attributes:
- profileId: String
- userId: String
- firstName: String
- lastName: String
- dateOfBirth: Date
- onboardingCompleted: Boolean
- personalizedPath: LearningPath

Methods:
+ completeOnboarding()
+ updatePersonalizedPath()
```

### Minigame
```
Attributes:
- gameId: String
- gameName: String
- gameType: MinigameType
- description: String
- instructions: String
- difficultyLevels: List<DifficultyLevel>
- intuitionCategory: IntuitionType
- isPremium: Boolean

Methods:
+ startGame()
+ pauseGame()
+ resumeGame()
+ endGame()
+ calculateScore()
```

### MinigameSession
```
Attributes:
- sessionId: String
- userId: String
- gameId: String
- startTime: Date
- endTime: Date
- score: Integer
- accuracy: Float
- speed: Float
- difficulty: DifficultyLevel
- hintsUsed: Integer
- completed: Boolean

Methods:
+ recordAnswer()
+ useHint()
+ calculateFinalScore()
```

### UserProgress
```
Attributes:
- progressId: String
- userId: String
- overallIntuitionScore: Integer
- categoryScores: Map<IntuitionType, Integer>
- totalGamesPlayed: Integer
- currentStreak: Integer
- longestStreak: Integer
- lastActivityDate: Date

Methods:
+ updateScore()
+ incrementStreak()
+ resetStreak()
+ calculateImprovement()
```

### Subscription
```
Attributes:
- subscriptionId: String
- userId: String
- planType: SubscriptionPlan
- status: SubscriptionStatus
- startDate: Date
- endDate: Date
- autoRenew: Boolean
- paymentMethod: String

Methods:
+ upgrade()
+ downgrade()
+ cancel()
+ renew()
+ checkAccess()
```
