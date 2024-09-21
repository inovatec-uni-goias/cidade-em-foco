package com.br.inovatec.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.inovatec.entity.Report;

public interface ReportRepository extends JpaRepository<Report, Long> {

}
