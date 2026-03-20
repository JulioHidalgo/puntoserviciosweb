<template>
    <section id="contacto" class="contact-section py-5">
        <div class="container">
            <div class="text-center mb-4">
                <h2 class="text-white">📧 Contáctanos</h2>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <form id="formulario" action="/inc/sendemail.php" class="needs-validation" method="post" autocomplete="on" novalidate>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <input type="text" class="form-control" id="name" name="name" placeholder="Nombre"
                                    autocomplete="name" required>
                                <div class="invalid-feedback">Por favor ingresa tu nombre.</div>
                            </div>
                            <div class="col-md-6">
                                <input type="tel" class="form-control" id="phone" name="phone" placeholder="Teléfono"
                                    autocomplete="tel">
                                <div class="invalid-feedback">Por favor ingresa tu número de teléfono.</div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <input type="email" class="form-control" id="email" name="email" placeholder="Email"
                                    autocomplete="email" required>
                                <div class="invalid-feedback">Por favor ingresa un email válido.</div>
                            </div>
                            <div class="col-md-6">
                                <input type="text" class="form-control" id="empresa" name="empresa"
                                    placeholder="Empresa" autocomplete="organization">
                                <div class="invalid-feedback">Por favor ingresa el nombre de tu empresa.</div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-12">
                                <textarea class="form-control" id="message" name="message" placeholder="Mensaje..."
                                    rows="4" autocomplete="off" required></textarea>
                                <div class="invalid-feedback">Por favor ingresa tu mensaje.</div>
                            </div>
                        </div>
                        <div class="text-right">
                            <button class="btn btn-primary" type="submit">Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>