import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.neural_network import MLPRegressor
from xgboost import XGBRegressor  # Import XGBoost regressor
from sklearn.metrics import mean_absolute_error
import joblib

# Načtení a příprava dat
df = pd.read_csv('data.csv')
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

# Rozdělení dat
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Definice modelů včetně XGBoost a MLP
models = {
    "Linear Regression": Pipeline([
        ('preprocessor', preprocessor),
        ('regressor', LinearRegression())
    ]),
    "Decision Tree": Pipeline([
        ('preprocessor', preprocessor),
        ('regressor', DecisionTreeRegressor(random_state=42))
    ]),
    "Random Forest": Pipeline([
        ('preprocessor', preprocessor),
        ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
    ]),
    "MLP": Pipeline([
        ('preprocessor', preprocessor),
        ('regressor', MLPRegressor(
            hidden_layer_sizes=(100, 50),
            activation='relu',
            solver='adam',
            max_iter=500,
            random_state=42
        ))
    ]),
    "XGBoost": Pipeline([
        ('preprocessor', preprocessor),
        ('regressor', XGBRegressor(
            n_estimators=100,
            max_depth=6,
            learning_rate=0.1,
            random_state=42,
            objective='reg:squarederror'
        ))
    ])
}

# Trénování a evaluace + export modelů
results = {}
for name, model in models.items():
    print(f"Trénování modelu: {name}")
    model.fit(X_train, y_train)
    
    # Predikce na testovací sadě
    y_pred = model.predict(X_test)
    
    # Výpočet MAE (Mean Absolute Error)
    mae = mean_absolute_error(y_test, y_pred)
    results[name] = mae
    
    # Export modelu do souboru pomocí joblib
    filename = f"{name.replace(' ', '_').lower()}_model.pkl"
    joblib.dump(model, filename)
    print(f"Model '{name}' byl exportován jako '{filename}'")

# Výpis výsledků
print("\nVýsledky MAE pro jednotlivé modely:")
for model_name, mae in results.items():
    print(f"{model_name}: {mae:.2f} USD")
