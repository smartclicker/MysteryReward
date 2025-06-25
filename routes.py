import os
import uuid
from flask import render_template, request, redirect, url_for, session, flash, jsonify
from werkzeug.utils import secure_filename
from app import app

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    """Landing page with login form"""
    return render_template('login.html')

@app.route('/hints')
def hints():
    """Hints page - accessible without login"""
    return render_template('hints.html')

@app.route('/login', methods=['POST'])
def login():
    """Handle login form submission"""
    password = request.form.get('password')
    
    # For MVP, we'll accept any non-empty password
    # Authentication logic can be implemented later
    if password:
        session['logged_in'] = True
        session['user_id'] = str(uuid.uuid4())  # Generate session ID
        app.logger.info(f"User logged in with session ID: {session['user_id']}")
        return redirect(url_for('upload'))
    else:
        flash('Bitte geben Sie ein Passwort ein, um fortzufahren', 'error')
        return redirect(url_for('index'))

@app.route('/upload')
def upload():
    """Upload page - requires login"""
    if not session.get('logged_in'):
        flash('Bitte melden Sie sich zuerst an', 'error')
        return redirect(url_for('index'))
    
    return render_template('upload.html')

@app.route('/upload_photo', methods=['POST'])
def upload_photo():
    """Handle photo upload"""
    if not session.get('logged_in'):
        return jsonify({'error': 'Nicht angemeldet'}), 401
    
    if 'photo' not in request.files:
        return jsonify({'error': 'Keine Datei hochgeladen'}), 400
    
    file = request.files['photo']
    
    if file.filename == '':
        return jsonify({'error': 'Keine Datei ausgewählt'}), 400
    
    if file and allowed_file(file.filename):
        # Generate unique filename
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4()}_{filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        
        try:
            file.save(filepath)
            session['uploaded_photo'] = unique_filename
            app.logger.info(f"Photo uploaded successfully: {unique_filename}")
            return jsonify({'success': True, 'filename': unique_filename})
        except Exception as e:
            app.logger.error(f"Error saving file: {str(e)}")
            return jsonify({'error': 'Fehler beim Speichern der Datei'}), 500
    else:
        return jsonify({'error': 'Ungültiger Dateityp. Bitte laden Sie ein gültiges Bild hoch.'}), 400

@app.route('/result')
def result():
    """Result page showing gift voucher"""
    if not session.get('logged_in'):
        flash('Bitte melden Sie sich zuerst an', 'error')
        return redirect(url_for('index'))
    
    if not session.get('uploaded_photo'):
        flash('Bitte laden Sie zuerst ein Foto hoch', 'error')
        return redirect(url_for('upload'))
    
    return render_template('result.html')

@app.route('/logout')
def logout():
    """Clear session and return to login"""
    session.clear()
    flash('Sie wurden abgemeldet', 'info')
    return redirect(url_for('index'))

@app.errorhandler(413)
def too_large(e):
    """Handle file too large error"""
    return jsonify({'error': 'Datei zu groß. Maximale Größe beträgt 16MB.'}), 413

@app.errorhandler(404)
def not_found(e):
    """Handle 404 errors"""
    return render_template('login.html'), 404
