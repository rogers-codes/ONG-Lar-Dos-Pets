package br.com.onglardospets.volutariosapi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.view.RedirectView;

import java.lang.ProcessBuilder.Redirect;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Controller
public class VoluntarioController {
    private static final String NUMERO_WPP = "13997170586";

    public RedirectView enviarMensagem(
            @RequestParam String nome,
            @RequestParam String email,
            @RequestParam String telefone,
            @RequestParam String cidade,
            @RequestParam String disponibilidade,
            @RequestParam String mensagem) {

        String textoEnvio = ("""
                Olá! Gostaria de me tornar um voluntário da Lar dos Pets.
                Nome: %s
                E-mail: %s
                Telefone: %s
                Cidade: %s
                Disponibilidade: %s
                Como desejo ajudar: %s
                """).formatted(nome,
                email,
                telefone,
                cidade,
                disponibilidade,
                mensagem
        );
        String textoCodificado = URLEncoder.encode(
                textoEnvio,
                StandardCharsets.UTF_8
        );
        String URLWpp = "https://wa.me/" + NUMERO_WPP + "?text=" + textoCodificado;
        return new RedirectView(URLWpp);
    }
}
