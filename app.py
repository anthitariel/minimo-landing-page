# app.py
from flask import Flask, request, jsonify, render_template

app = Flask(__name__, static_folder='.', template_folder='.') # Configure Flask to serve static files and templates from the root

# Route to serve the main HTML file
@app.route('/')
def serve_landing_page():
    # Renders the index.html file
    return render_template('index.html')

# API endpoint to handle the contact form submission
@app.route('/api/contact', methods=['POST'])
def handle_contact_form():
    if request.is_json:
        data = request.get_json()
        email = data.get('email')
        message = data.get('message')

        # In a real application, you would:
        # 1. Validate the data
        # 2. Store the data in a database (e.g., PostgreSQL, MongoDB)
        # 3. Send an email notification (e.g., using smtplib)

        # For this example, we just log the data and return a success message
        print(f"--- NEW CONTACT FORM SUBMISSION ---")
        print(f"Email: {email}")
        print(f"Message: {message[:50]}...") # Print first 50 chars of message
        print(f"---------------------------------")

        # Return a modern JSON response
        return jsonify({
            "status": "success",
            "message": "Thank you for your message! We will be in touch shortly."
        }), 200
    else:
        return jsonify({"status": "error", "message": "Request must be JSON"}), 400

# Boilerplate to run the application
if __name__ == '__main__':
    # Running in debug mode is suitable for local development
    app.run(debug=True)