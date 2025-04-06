# train_mlp.py
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.neural_network import MLPRegressor
from sklearn.metrics import mean_absolute_error

# Načtení a příprava dat
df = pd.read_csv('combined_bikes.csv')
df = df[df['price'] > 1].copy()
features = ['year', 'condition', 'frame_size', 'wheel_size', 
           'material', 'front_travel', 'rear_travel', 'type']
X = df[features]
y = df['price']

# Definice preprocessing pipeline
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='constant', fill_value='Unknown')),
    ('onehot', OneHotEncoder(handle_unknown='ignore'))
])

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, ['year', 'condition', 'wheel_size', 'front_travel', 'rear_travel']),
        ('cat', categorical_transformer, ['frame_size', 'material', 'type'])
    ])

# Vylepšený MLP model
mlp_model = Pipeline([
    ('preprocessor', preprocessor),
    ('regressor', MLPRegressor(
        hidden_layer_sizes=(200, 100),
        activation='relu',
        solver='adam',
        early_stopping=True,
        validation_fraction=0.15,
        max_iter=1000,
        batch_size=32,
        random_state=42
    ))
])

# Rozdělení dat
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Trénování modelu
mlp_model.fit(X_train, y_train)

# Vyhodnocení
y_pred = mlp_model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
print(f"MLP MAE: {mae:.2f} USD")

# Uložení modelu
joblib.dump(mlp_model, 'best_mlp_model.pkl')
print("Model uložen jako 'best_mlp_model.pkl'")
