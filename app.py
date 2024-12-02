from flask import Flask, request, jsonify, render_template
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/schedule', methods=['POST'])
def schedule():
    data = request.json
    event_name = data['eventName']
    event_email = data['eventEmail']
    event_date = data['eventDate']
    event_time = data['eventTime']
    event_platform = data['eventPlataform']  # Corrigindo o nome para seguir padrão inglês
    
    # Configurações do servidor SMTP
    smtp_server = "smtp.gmail.com"
    smtp_port = 587

    # Credenciais
    email_sender = "paulocesarmartins2006@gmail.com"
    email_password = "jrmimzaofqttiyvf"
    email_recipient = event_email
    
    # Criando o e-mail
    subject = "Comprovante de Agendamento"
    body = f"""Olá,
    
Seu agendamento foi realizado com sucesso!
    
- Tema: {event_name}
- Data: {event_date}
- Hora: {event_time}
- Plataforma: {event_platform}
    
Atenciosamente,
Equipe de Agendamento."""

    # Montando o e-mail
    msg = MIMEMultipart()
    msg["From"] = email_sender
    msg["To"] = email_recipient
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    try:
        # Conexão com o servidor
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()  # Inicia conexão segura
        server.login(email_sender, email_password)
        server.send_message(msg)
        print("E-mail enviado com sucesso!")
    except Exception as e:
        print(f"Erro ao enviar o e-mail: {e}")
        return jsonify({"error": "Erro ao enviar o e-mail"}), 500
    finally:
        server.quit()

    return jsonify({
        'eventName': event_name,
        'eventEmail': event_email,
        'eventDate': event_date,
        'eventTime': event_time,
        'eventPlatform': event_platform,
        'message': "Agendamento realizado com sucesso!"
    })

if __name__ == '__main__':
    app.run(debug=True)
