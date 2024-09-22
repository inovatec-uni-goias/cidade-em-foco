package com.br.inovatec.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.br.inovatec.dto.LoginDto;
import com.br.inovatec.dto.LoginResponseDto;
import com.br.inovatec.entity.Account;
import com.br.inovatec.repository.AccountRepository;

@Service
public class LoginService {
    @Autowired
    AccountRepository accountRepository;

    public LoginResponseDto authenticateUser(LoginDto login) {
        Account account = accountRepository.findByEmail(login.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Não existe uma conta com esse email"));

        if (account.getPassword().equals(login.getPassword())) {
            return createSuccessResponse(account);
        } else {
            return createFailResponse();

        }
    }

    public LoginResponseDto createSuccessResponse(Account account) {
        LoginResponseDto response = new LoginResponseDto();
        response.setMessage("Login bem-sucedido");
        response.setSuccess(true);
        response.setAccount(account);
        return response;
    }

    public LoginResponseDto createFailResponse() {
        LoginResponseDto response = new LoginResponseDto();
        response.setMessage("Login mal-sucedido");
        response.setSuccess(false);
        response.setAccount(null);
        return response;
    }
}
