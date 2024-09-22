package com.br.inovatec.dto;

import com.br.inovatec.entity.Account;

public class LoginResponseDto {
    private String message;
    private boolean success;
    private Account account;

    public LoginResponseDto() {

    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

}
