# app.py
from flask import Flask, request, jsonify, render_template

# NOTE ON REQUIREMENTS:
# This application requires the Flask package. You can install it using pip:
# pip install Flask

# CRUCIAL CONFIGURATION:
# We set static_url_path='' and static_folder='.' to tell Flask to look for 
# CSS, JS, and IMG files in the current directory (modern-landing-page/) 
# and serve them directly from the root path (e.g., /css/style.css).
app = Flask(__name__, static_url_path='', static_folder='.', template_folder='.')

# Route to serve the main HTML file
@app.route('/')
def serve_landing_page():
    """Renders the index.html file."""
    return render_template('index.html')

# API endpoint to handle the contact form submission
@app.route('/api/contact', methods=['POST'])
def handle_contact_form():
    """
    Handles incoming JSON data from the contact form submission.
    In a real-world app, this data would be stored in a database or sent as an email.
    """
    if request.is_json:
        data = request.get_json()
        email = data.get('email')
        message = data.get('message')

        # Log the submission to the server console
        print("\n--- NEW CONTACT FORM SUBMISSION ---")
        print(f"Email: {email}")
        print(f"Message: {message[:100]}...") # Print first 100 chars
        print("-----------------------------------\n")

        # Return a modern JSON success response
        return jsonify({
            "status": "success",
            "message": "Thank you for your message! We will be in touch shortly."
        }), 200
    else:
        # Return an error if the request is not JSON
        return jsonify({"status": "error", "message": "Request must be JSON"}), 400

# Boilerplate to run the application
if __name__ == '__main__':
    # Running in debug mode is suitable for local development
    # Note: Flask automatically detects the app file via FLASK_APP=app.py,
    # but this block ensures it can be run directly as a script.
    app.run(debug=True)